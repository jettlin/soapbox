defmodule Soapbox.Models.Edit do
  use Ecto.Schema
  import Ecto.Changeset

  schema "edits" do
    field :end, :float
    field :scale, :integer
    field :start, :float
    field :type, :string

    belongs_to :asset, Soapbox.Models.Asset

    timestamps()
  end

  @doc false
  def changeset(edit, attrs) do
    edit
    |> cast(attrs, [:type, :start, :end, :scale, :asset_id])
    |> validate_required([:type])
    |> validate_required_fields
  end

  def validate_required_fields(changeset) do
    type = get_field(changeset, :type)

    case type do
      "trim" -> validate_present(changeset, [:start, :end])
      "rotate" -> validate_present(changeset, [:scale])
      _ -> add_error(changeset, :type, "Invalid type provided")
    end
  end

  def validate_present(changeset, fields) do
    if Enum.any?(fields, &present?(changeset, &1)) do
      changeset
    else
      add_error(changeset, hd(fields), "One of these fields must be present: #{inspect fields}")
    end
  end

  def present?(changeset, field) do
    value = get_field(changeset, field)
    value && value != ""
  end
end
