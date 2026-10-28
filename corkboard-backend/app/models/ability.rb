class Ability
  include CanCan::Ability

  def initialize(user)
    @user = user ||= User.new

    if @user.superadmin?
      can :manage, User
    elsif @user.persisted?
      workspace_ids = @user.workspaces.pluck(:id)

      can :manage, User, id: @user.id
      can :manage, UserPreference, user_id: @user.id
      can :read, User
      can :manage, Release, workspace_id: workspace_ids
      can :manage, Tag, workspace_id: workspace_ids
      can :manage, Task, workspace_id: workspace_ids
      can :manage, Document, workspace_id: workspace_ids
      can :create, Workspace
      can :manage, Workspace, id: workspace_ids
      cannot :destroy, Workspace do |workspace|
        workspace.owner_id != @user.id || @user.owned_workspaces.count <= 1
      end
      can :manage, WorkspaceInvitation do |invitation|
        invitation.invited_by_user_id == @user.id || invitation.invited_user_id == @user.id
      end
    else
      can :read, User
    end
  end
end

