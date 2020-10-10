defmodule SoapboxWeb.UserController do
  use SoapboxWeb, :controller

  alias Soapbox.Models
  alias Soapbox.Models.User
  alias Soapbox.Guardian

  action_fallback SoapboxWeb.FallbackController

  def index(conn, _params) do
    resource = Guardian.Plug.current_resource(conn)

    IO.puts resource.username
    IO.puts resource.role

    users = if (resource.role == "admin"), do: Models.list_users(), else: []

    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Models.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Models.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Models.get_user!(id)

    with {:ok, %User{} = user} <- Models.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Models.get_user!(id)

    with {:ok, %User{}} <- Models.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  def auth(conn, %{"username" => username, "password" => password}) do
    case Models.token_sign_in(username, password) do
      {:ok, token, _claims} -> conn |> render("jwt.json", jwt: token)
      _ -> {:error, :unauthorized}
    end
  end
end
