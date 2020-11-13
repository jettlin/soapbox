defmodule Soapbox.Repo.Migrations.CreateEdits do
  use Ecto.Migration

  def change do
    create table(:edits) do
      add :type, :string
      add :start, :float
      add :end, :float
      add :scale, :integer
      add :asset_id, references(:assets, on_delete: :nothing)

      timestamps()
    end

    create index(:edits, [:asset_id])
  end
end
