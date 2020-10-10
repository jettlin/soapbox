# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :soapbox,
  ecto_repos: [Soapbox.Repo]

# Configures the endpoint
config :soapbox, SoapboxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bhjv0CN1Nnkqra0ePpRmbvpJ8bKLd93gyRvwcnKyLgQkrKcLHnFyNYGWGlhKtT09",
  render_errors: [view: SoapboxWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Soapbox.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "TA/OeVIa"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
