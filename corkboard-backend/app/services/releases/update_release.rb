module Releases
  class UpdateRelease
    def initialize(release:, params:)
      @release = release
      @params = params.except(:order)
      @new_order = params[:order]
      @new_status = params[:status]
    end

    def call
      ActiveRecord::Base.transaction do
        remove_from_old_position
        insert_into_new_position
        @params[:order] = normalize_new_order
        release.update!(@params)
      end
    end

    private
    attr_reader :release, :params, :new_status, :new_order

    def old_order
      release.order
    end

    def old_status
      release.status
    end

    def same_status?
       old_status == new_status
    end

    def remove_from_old_position
      Release.where(status: old_status).where.not(id: release.id)
             .where('"order" > ?', old_order)
             .update_all('"order" = "order" - 1')
    end

    def insert_into_new_position
      Release.where(status: new_status)
             .where.not(id: release.id)
             .where('"order" >= ?', new_order)
             .update_all('"order" = "order" + 1')
    end

    def normalize_new_order
      [raw_new_order, max_allowed_order].min
    end

    def raw_new_order
      [new_order.to_i, 0].max
    end

    def max_allowed_order
      Release.where(status: new_status, workspace_id: release.workspace_id).count
    end
  end
end