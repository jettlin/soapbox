defmodule SoapboxWeb.UserView do
  use SoapboxWeb, :view
  alias SoapboxWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("jwt.json", %{jwt: jwt, role: role}) do
    %{
      token: jwt,
      role: role
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      role: user.role
    }
  end
end
