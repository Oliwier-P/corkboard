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
      can :manage, Workspace, id: workspace_ids
      can :manage, WorkspaceInvitation do |invitation|
        invitation.invited_by_user_id == @user.id || invitation.invited_user_id == @user.id
      end
      can :manage, Document do |document|
        document.workspace_id.in?(workspace_ids) || document.task&.workspace_id.in?(workspace_ids)
      end
    else
      can :read, User
    end
  end
end

