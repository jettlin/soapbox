defmodule Soapbox.Models do
  @moduledoc """
  The Models context.
  """

  import Ecto.Query, warn: false
  alias Soapbox.Repo

  alias Soapbox.Models.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

    alias Soapbox.Guardian
  import Bcrypt, only: [verify_pass: 2, no_user_verify: 0]

  def token_sign_in(username, password) do
    case username_password_auth(username, password) do
      {:ok, user} -> Guardian.encode_and_sign(user)
      _ -> {:error, :unauthorized}
    end
  end

  defp get_by_username(username) when is_binary(username) do
    case Repo.get_by(User, username: username) do
      nil ->
        no_user_verify()
        {:error, "Login error"}
      user ->
        {:ok, user}
    end
  end

  defp verify_password(password, %User{} = user) when is_binary(password) do
    if verify_pass(password, user.password_hash) do
      {:ok, user}
    else
      {:error, :invalid_password}
    end
  end

  defp username_password_auth(username, password) when is_binary(username) and is_binary(password) do
    with {:ok, user} <- get_by_username(username), do: verify_password(password, user)
  end

  alias Soapbox.Models.Video

  @doc """
  Returns the list of videos.

  ## Examples

      iex> list_videos()
      [%Video{}, ...]

  """
  def list_videos do
    Repo.all(Video)
  end

  def list_videos_for(user_id) do
    Repo.get_by(Video, user_id: user_id)
  end

  @doc """
  Gets a single video.

  Raises `Ecto.NoResultsError` if the Video does not exist.

  ## Examples

      iex> get_video!(123)
      %Video{}

      iex> get_video!(456)
      ** (Ecto.NoResultsError)

  """
  def get_video!(id), do: Repo.get!(Video, id)

  @doc """
  Creates a video.

  ## Examples

      iex> create_video(%{field: value})
      {:ok, %Video{}}

      iex> create_video(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_video(attrs \\ %{}) do
    %Video{}
    |> Video.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a video.

  ## Examples

      iex> update_video(video, %{field: new_value})
      {:ok, %Video{}}

      iex> update_video(video, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_video(%Video{} = video, attrs) do
    video
    |> Video.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a video.

  ## Examples

      iex> delete_video(video)
      {:ok, %Video{}}

      iex> delete_video(video)
      {:error, %Ecto.Changeset{}}

  """
  def delete_video(%Video{} = video) do
    Repo.delete(video)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking video changes.

  ## Examples

      iex> change_video(video)
      %Ecto.Changeset{source: %Video{}}

  """
  def change_video(%Video{} = video) do
    Video.changeset(video, %{})
  end

  def get_assets_for(%Video{} = video) do
    Repo.all(Ecto.assoc(video, :assets))
  end

  alias Soapbox.Models.Asset

  @doc """
  Returns the list of assets.

  ## Examples

      iex> list_assets()
      [%Asset{}, ...]

  """
  def list_assets do
    Repo.all(Asset)
  end

  @doc """
  Gets a single asset.

  Raises `Ecto.NoResultsError` if the Asset does not exist.

  ## Examples

      iex> get_asset!(123)
      %Asset{}

      iex> get_asset!(456)
      ** (Ecto.NoResultsError)

  """
  def get_asset!(id), do: Repo.get!(Asset, id)

  @doc """
  Creates a asset.

  ## Examples

      iex> create_asset(%{field: value})
      {:ok, %Asset{}}

      iex> create_asset(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_asset(attrs \\ %{}) do
    %Asset{}
    |> Asset.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a asset.

  ## Examples

      iex> update_asset(asset, %{field: new_value})
      {:ok, %Asset{}}

      iex> update_asset(asset, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_asset(%Asset{} = asset, attrs) do
    asset
    |> Asset.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a asset.

  ## Examples

      iex> delete_asset(asset)
      {:ok, %Asset{}}

      iex> delete_asset(asset)
      {:error, %Ecto.Changeset{}}

  """
  def delete_asset(%Asset{} = asset) do
    Repo.delete(asset)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking asset changes.

  ## Examples

      iex> change_asset(asset)
      %Ecto.Changeset{source: %Asset{}}

  """
  def change_asset(%Asset{} = asset) do
    Asset.changeset(asset, %{})
  end

  alias Soapbox.Models.Edit

  @doc """
  Returns the list of edits.

  ## Examples

      iex> list_edits()
      [%Edit{}, ...]

  """
  def list_edits do
    Repo.all(Edit)
  end

  @doc """
  Gets a single edit.

  Raises `Ecto.NoResultsError` if the Edit does not exist.

  ## Examples

      iex> get_edit!(123)
      %Edit{}

      iex> get_edit!(456)
      ** (Ecto.NoResultsError)

  """
  def get_edit!(id), do: Repo.get!(Edit, id)

  @doc """
  Creates a edit.

  ## Examples

      iex> create_edit(%{field: value})
      {:ok, %Edit{}}

      iex> create_edit(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_edit(attrs \\ %{}) do
    %Edit{}
    |> Edit.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a edit.

  ## Examples

      iex> update_edit(edit, %{field: new_value})
      {:ok, %Edit{}}

      iex> update_edit(edit, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_edit(%Edit{} = edit, attrs) do
    edit
    |> Edit.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a edit.

  ## Examples

      iex> delete_edit(edit)
      {:ok, %Edit{}}

      iex> delete_edit(edit)
      {:error, %Ecto.Changeset{}}

  """
  def delete_edit(%Edit{} = edit) do
    Repo.delete(edit)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking edit changes.

  ## Examples

      iex> change_edit(edit)
      %Ecto.Changeset{source: %Edit{}}

  """
  def change_edit(%Edit{} = edit) do
    Edit.changeset(edit, %{})
  end

  import FFmpex
  use FFmpex.Options

  def set_option(command, %Edit{} = edit) do
    case edit.type do
      "rotate" -> command |> add_file_option(option_vf("rotate=#{edit.scale}*PI/180"))
      "trim" -> command |> add_file_option(option_ss(edit.start)) |> add_file_option(option_t(edit.end))
      _ -> command
    end
  end

  def apply_edits(command, edits) do
    Enum.reduce(edits, command, fn(e, c) -> set_option(c, e) end)
  end

  def process_asset(%Asset{} = asset, orig) do
    extension = List.last(String.split(orig, "."))

    edits = Repo.all(Ecto.assoc(asset, :edits))
    video = Repo.one(Ecto.assoc(asset, :video))

    command =
      FFmpex.new_command
      |> add_global_option(option_y())
      |> add_input_file(orig)
      |> add_output_file(Path.absname("priv/static/videos/#{video.id}/#{asset.id}.#{extension}"))
        |> add_stream_specifier(stream_type: :video)
        |> apply_edits(edits)

    execute(command)

    duration = FFprobe.duration(Path.absname("priv/static/videos/#{video.id}/#{asset.id}.#{extension}"))
    update_asset(asset, %{ src: "/videos/#{video.id}/#{asset.id}.#{extension}", duration: duration })
  end

  def generate_screenshot(%Asset{} = asset) do
    video = Repo.one(Ecto.assoc(asset, :video))

    command =
      FFmpex.new_command
      |> add_global_option(option_y())
      |> add_input_file(Path.absname("priv/static/#{asset.src}"))
      |> add_output_file(Path.absname("priv/static/videos/#{video.id}/screenshot.jpg"))
        |> add_file_option(option_vframes(1))

    execute(command)
  end
end
