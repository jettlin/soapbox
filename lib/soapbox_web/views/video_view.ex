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
    assets = Soapbox.Models.get_assets_for(video)

    %{
      id: video.id,
      name: video.name,
      assets: render_many(assets, SoapboxWeb.AssetView, "asset.json")
    }
  end
end
