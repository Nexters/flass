require 'test_helper'

class ReplayAtsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @replay_at = replay_ats(:one)
  end

  test "should get index" do
    get replay_ats_url
    assert_response :success
  end

  test "should get new" do
    get new_replay_at_url
    assert_response :success
  end

  test "should create replay_at" do
    assert_difference('ReplayAt.count') do
      post replay_ats_url, params: { replay_at: { lecture_id: @replay_at.lecture_id, playtime: @replay_at.playtime, user_id: @replay_at.user_id } }
    end

    assert_redirected_to replay_at_url(ReplayAt.last)
  end

  test "should show replay_at" do
    get replay_at_url(@replay_at)
    assert_response :success
  end

  test "should get edit" do
    get edit_replay_at_url(@replay_at)
    assert_response :success
  end

  test "should update replay_at" do
    patch replay_at_url(@replay_at), params: { replay_at: { lecture_id: @replay_at.lecture_id, playtime: @replay_at.playtime, user_id: @replay_at.user_id } }
    assert_redirected_to replay_at_url(@replay_at)
  end

  test "should destroy replay_at" do
    assert_difference('ReplayAt.count', -1) do
      delete replay_at_url(@replay_at)
    end

    assert_redirected_to replay_ats_url
  end
end
