defmodule SoapboxWeb.VideoController do
  use SoapboxWeb, :controller

  alias Soapbox.Models
  alias Soapbox.Models.Video
  alias Soapbox.Models.Asset
  alias Soapbox.Models.Edit

  action_fallback SoapboxWeb.FallbackController

  def index(conn, _params) do
    resource = Guardian.Plug.current_resource(conn)

    videos = if (resource.role == "admin"), do: Models.list_videos(), else: Models.list_videos_for(resource.id)
    render(conn, "index.json", videos: videos)
  end

  def create(conn, %{"file" => video_src}) do
    resource = Guardian.Plug.current_resource(conn)
    video_arr = String.split(video_src.filename, ".");

    with {:ok, %Video{} = video} <- Models.create_video(%{ user_id: resource.id, name: List.first(video_arr) }) do
      File.mkdir_p(Path.absname("priv/static/videos/#{video.id}"))

      with {:ok, %Asset{} = asset} <- Models.create_asset(%{ video_id: video.id, is_original: true, name: "original"}) do
        extension = List.last(video_arr)
        File.cp(video_src.path, Path.absname("priv/static/videos/#{video.id}/#{asset.id}.#{extension}"))

        # in case we have a larger video we want to spawn this out to enure getting the duration is not causing a socket timeout
        spawn fn ->
          duration = FFprobe.duration(Path.absname("priv/static/videos/#{video.id}/#{asset.id}.#{extension}"))

          { _, asset } = Models.update_asset(asset, %{ src: "/videos/#{video.id}/#{asset.id}.#{extension}", duration: duration })
          Models.generate_screenshot(asset)
        end

        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.video_path(conn, :show, video))
        |> render("show.json", video: video)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    video = Models.get_video!(id)
    render(conn, "show.json", video: video)
  end

  def update(conn, %{"id" => id, "original" => original, "edits" => edits, "tag" => tag}) do
    video = Models.get_video!(id)
    o_asset = Models.get_asset!(original)

    with {:ok, %Asset{} = asset} <- Models.create_asset(%{video_id: video.id, name: tag, is_original: false}) do
      for i <- edits do
        changes = Map.put(i, "asset_id", asset.id)
        Models.create_edit(changes)
      end

      spawn fn ->
        Models.process_asset(asset, Path.absname("priv/static#{o_asset.src}"))
      end

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
