defmodule SoapboxWeb.VideoController do
  use SoapboxWeb, :controller

  alias Soapbox.Models
  alias Soapbox.Models.Video

  action_fallback SoapboxWeb.FallbackController

  def index(conn, _params) do
    resource = Guardian.Plug.current_resource(conn)

    videos = if (resource.role == "admin"), do: Models.list_videos(), else: Models.list_videos_for(resource.id)
    render(conn, "index.json", videos: videos)
  end

  def create(conn, %{"name" => name, "file" => video_src}) do
    resource = Guardian.Plug.current_resource(conn)

    IO.inspect video_src
    IO.puts String.split(video_src.filename, ".")

    with {:ok, %Video{} = video} <- Models.create_video(%{ user_id: resource.id, name: name }) do
      extension = List.last(String.split(video_src.filename, "."))
      File.cp(video_src.path, Path.absname("priv/static/videos/#{video.id}.#{extension}"))

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.video_path(conn, :show, video))
      |> render("show.json", video: video)
    end
  end

  def show(conn, %{"id" => id}) do
    video = Models.get_video!(id)
    render(conn, "show.json", video: video)
  end

  def update(conn, %{"id" => id, "video" => video_params}) do
    video = Models.get_video!(id)

    with {:ok, %Video{} = video} <- Models.update_video(video, video_params) do
      render(conn, "show.json", video: video)
    end
  end

  def delete(conn, %{"id" => id}) do
    video = Models.get_video!(id)

    with {:ok, %Video{}} <- Models.delete_video(video) do
      send_resp(conn, :no_content, "")
    end
  end
end
