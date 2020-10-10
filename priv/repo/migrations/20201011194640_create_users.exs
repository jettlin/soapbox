defmodule Soapbox.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :password_hash, :string
      add :role, :string, default: "user"

      timestamps()
    end

    create unique_index(:users, [:username])
  end
end
