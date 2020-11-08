defmodule Soapbox.ModelsTest do
  use Soapbox.DataCase

  alias Soapbox.Models

  describe "users" do
    alias Soapbox.Models.User

    @valid_attrs %{password: "some password", password_confirmation: "some password", username: "some username"}
    @update_attrs %{password: "some updated password", password_confirmation: "some updated password", username: "some updated username"}
    @invalid_attrs %{password: nil, username: nil, password_confirmation: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Models.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      user_list = Models.list_users()

      assert length(user_list) == 1
      assert user_list.at(0).username == user.username
      assert user_list.at(0).password_hash == user.password_hash
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Models.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Models.create_user(@valid_attrs)
      assert user.id != nil
      assert user.username == "some username"
      assert user.role == "user"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Models.update_user(user, @update_attrs)
      assert user.password_hash == "some updated password_hash"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_user(user, @invalid_attrs)
      assert user == Models.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Models.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Models.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Models.change_user(user)
    end
  end

  describe "videos" do
    alias Soapbox.Models.Video

    @valid_attrs %{name: "some name", user_id: 1}
    @update_attrs %{name: "some updated name", user_id: 1}
    @invalid_attrs %{name: nil, user_id: nil}

    def video_fixture(attrs \\ %{}) do
      {:ok, video} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Models.create_video()

      video
    end

    test "list_videos/0 returns all videos" do
      video = video_fixture()
      assert Models.list_videos() == [video]
    end

    test "get_video!/1 returns the video with given id" do
      video = video_fixture()
      assert Models.get_video!(video.id) == video
    end

    test "create_video/1 with valid data creates a video" do
      assert {:ok, %Video{} = video} = Models.create_video(@valid_attrs)
      assert video.name == "some name"
    end

    test "create_video/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_video(@invalid_attrs)
    end

    test "update_video/2 with valid data updates the video" do
      video = video_fixture()
      assert {:ok, %Video{} = video} = Models.update_video(video, @update_attrs)
      assert video.name == "some updated name"
    end

    test "update_video/2 with invalid data returns error changeset" do
      video = video_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_video(video, @invalid_attrs)
      assert video == Models.get_video!(video.id)
    end

    test "delete_video/1 deletes the video" do
      video = video_fixture()
      assert {:ok, %Video{}} = Models.delete_video(video)
      assert_raise Ecto.NoResultsError, fn -> Models.get_video!(video.id) end
    end

    test "change_video/1 returns a video changeset" do
      video = video_fixture()
      assert %Ecto.Changeset{} = Models.change_video(video)
    end
  end
end
