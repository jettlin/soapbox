defmodule Soapbox.Models.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    # Physical fields
    field :password_hash, :string
    field :username, :string
    field :role, :string

    # Virtual fields
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    # Timestamps are added by default, good to have
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password, :password_confirmation, :role])
    |> validate_required([:username, :password, :password_confirmation])
    |> validate_length(:password, min: 8)
    |> validate_confirmation(:password)
    |> unique_constraint(:username)
    |> put_password_hash
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}}
        -> put_change(changeset, :password_hash, Bcrypt.hash_pwd_salt(pass))
      _ -> changeset
    end
  end
end
