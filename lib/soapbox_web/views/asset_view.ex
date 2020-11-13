defmodule SoapboxWeb.AssetView do
  use SoapboxWeb, :view
  alias SoapboxWeb.AssetView

  def render("index.json", %{assets: assets}) do
    %{data: render_many(assets, AssetView, "asset.json")}
  end

  def render("show.json", %{asset: asset}) do
    %{data: render_one(asset, AssetView, "asset.json")}
  end

  def render("asset.json", %{asset: asset}) do
    %{id: asset.id,
      src: asset.src,
      tag: asset.name,
      is_original: asset.is_original,
      duration: asset.duration}
  end
end
