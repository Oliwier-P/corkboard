class WorkspaceBroadcaster
  def self.release_changed(release, type:, actor_id:)
    siblings = release.workspace.releases.to_a
    next_id = Release.next_release_id(siblings)

    broadcast(release.workspace_id, type: type, actor_id: actor_id,
              release: release.as_broadcast(next_id: next_id))
  end

  def self.releases_moved(workspace, actor_id:)
    releases = workspace.releases.includes(:tasks).reorder(:position).to_a
    next_id = Release.next_release_id(releases)

    broadcast(workspace.id, type: "release_moved", actor_id: actor_id,
              releases: releases.map { |r| r.as_broadcast(next_id: next_id) })
  end

  def self.broadcast(workspace_id, payload)
    ActionCable.server.broadcast("workspace_#{workspace_id}", payload)
  end

  private_class_method :broadcast
end
