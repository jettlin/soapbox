defmodule Soapbox.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :MyApi,
  module: Soapbox.Guardian,
  error_handler: Soapbox.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end