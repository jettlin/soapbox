defmodule Soapbox.Guardian do
  use Guardian, otp_app: :soapbox

  def subject_for_token(user, _claims) do
    sub = %{id: user.id, role: user.role}
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    resource = Soapbox.Models.get_user!(id)
    {:ok, resource}
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end