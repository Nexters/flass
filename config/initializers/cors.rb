Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:4000'
    resource '*',
    headers: :any,
    credentials: true,
    methods: %i(get post put patch delete options head)
  end
end
