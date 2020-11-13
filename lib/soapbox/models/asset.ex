defmodule Soapbox.Models.Asset do
  use Ecto.Schema
  import Ecto.Changeset

  schema "assets" do
    field :duration, :float
    field :is_original, :boolean, default: false
    field :name, :string
    field :src, :string

    belongs_to :video, Soapbox.Models.Video
    has_many :edits, Soapbox.Models.Edit, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(asset, attrs) do
    asset
    |> cast(attrs, [:src, :name, :is_original, :duration, :video_id])
    |> validate_required([:video_id, :name, :is_original])
  end
end
