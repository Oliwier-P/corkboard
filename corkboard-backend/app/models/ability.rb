class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    if user.superadmin?
      can :manage, :User
    else
      workspace_ids = user.workspace_ids

      can :manage, :User, id: user.id
      can :read, Workspace, id: workspace_ids
      can :manage, [Task, Release, Tag], workspace_id: workspace_ids
      can :manage, :Document
    end
  end
end
