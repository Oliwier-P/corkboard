Rails.application.configure do
  config.action_cable.mount_path = "/cable"
  config.action_cable.url = ENV.fetch("WS_URL", "ws://localhost:3000/cable")
  config.action_cable.allowed_request_origins = ENV.fetch("ALLOWED_ORIGINS", "").split(",").map(&:strip).reject(&:empty?)
end