defmodule Soapbox.Models.Video do
  use Ecto.Schema
  import Ecto.Changeset

  schema "videos" do
    field :name, :string

    belongs_to :user, Soapbox.Models.User

    timestamps()
  end

  @doc false
  def changeset(video, attrs) do
    video
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
  end
end
