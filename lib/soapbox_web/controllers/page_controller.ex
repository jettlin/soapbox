defmodule SoapboxWeb.PageController do
  use SoapboxWeb, :controller

  def index(conn, _params) do
    html(conn, File.read!("./priv/static/index.html"))
  end
end
