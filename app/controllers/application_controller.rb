class ApplicationController < ActionController::Base
  # Desabilita proteção CSRF para APIs
  # Somente controllers de API devem pular a verificação
  protect_from_forgery with: :exception
end
