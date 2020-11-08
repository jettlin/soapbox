defmodule SoapboxWeb.Router do
  use SoapboxWeb, :router

  alias Soapbox.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_authenticated do
    plug Guardian.AuthPipeline
  end

  scope "/api", SoapboxWeb do
    pipe_through :api

    post "/sign_up", UserController, :create
    post "/auth", UserController, :auth

    # This is going to get moved into the authenticated section
    # resources "/users", UserController, except: [:new, :edit]
  end

  scope "/api", SoapboxWeb do
    pipe_through [:api, :api_authenticated]

    resources "/users", UserController, except: [:new, :create, :edit]
    resources "/videos", VideoController, except: [:new, :edit]
  end

  scope "/", SoapboxWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
