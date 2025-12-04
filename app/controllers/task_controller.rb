class TaskController < ApplicationController
  def index
    # Renderiza app/views/task/index.html.erb sem layout
    # O HTML já contém a estrutura completa com Vite + Vue
    render :index, layout: false
  end
end
