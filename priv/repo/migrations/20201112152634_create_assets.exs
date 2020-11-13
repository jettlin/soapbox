defmodule Soapbox.Repo.Migrations.CreateAssets do
  use Ecto.Migration

  def change do
    create table(:assets) do
      add :src, :string
      add :name, :string
      add :is_original, :boolean, default: false, null: false
      add :duration, :float
      add :video_id, references(:videos, on_delete: :nothing)

      timestamps()
    end

    create index(:assets, [:video_id])
  end
end
