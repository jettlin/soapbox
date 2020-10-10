use Mix.Config

# Configure your database
config :soapbox, Soapbox.Repo,
  username: "postgres",
  password: "postgres",
  database: "soapbox_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :soapbox, SoapboxWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Turn down BCRYPT so that it will not slow down tests
config :bcrypt_elixir, :log_rounds, 4
