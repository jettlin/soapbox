defmodule SoapboxWeb.EditView do
  use SoapboxWeb, :view
  alias SoapboxWeb.EditView

  def render("index.json", %{edits: edits}) do
    %{data: render_many(edits, EditView, "edit.json")}
  end

  def render("show.json", %{edit: edit}) do
    %{data: render_one(edit, EditView, "edit.json")}
  end

  def render("edit.json", %{edit: edit}) do
    %{id: edit.id,
      type: edit.type,
      start: edit.start,
      end: edit.end,
      scale: edit.scale}
  end
end
