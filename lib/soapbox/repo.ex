defmodule Soapbox.Repo do
  use Ecto.Repo,
    otp_app: :soapbox,
    adapter: Ecto.Adapters.Postgres
end
