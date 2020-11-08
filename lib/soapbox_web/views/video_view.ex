defmodule SoapboxWeb.VideoView do
  use SoapboxWeb, :view
  alias SoapboxWeb.VideoView

  def render("index.json", %{videos: videos}) do
    %{data: render_many(videos, VideoView, "video.json")}
  end

  def render("show.json", %{video: video}) do
    %{data: render_one(video, VideoView, "video.json")}
  end

  def render("video.json", %{video: video}) do
    %{
      id: video.id,
      name: video.name
    }
  end
end
