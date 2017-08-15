require 'test_helper'

class CommentChildrenControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get comment_children_create_url
    assert_response :success
  end

  test "should get edit" do
    get comment_children_edit_url
    assert_response :success
  end

  test "should get update" do
    get comment_children_update_url
    assert_response :success
  end

  test "should get destroy" do
    get comment_children_destroy_url
    assert_response :success
  end

end
