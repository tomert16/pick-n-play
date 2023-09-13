class SessionsController < ApplicationController
  skip_before_action :authorized, only: [:create, :create_admin]
  
  def create
    player = Player.find_by!(email: params[:email])
    if player&.authenticate(params[:password])
      session[:player_id] = player.id
      render json: player, status: :ok
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:player_id)
    head :no_content
  end

  def create_admin
    admin = Admin.find_by!(email: params[:email])
    if admin&.authenticate(params[:password])
      session[:admin_id] = admin.id
      render json: admin, status: :ok
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  def destroy_admin
    session.delete(:admin_id)
    head :no_content
  end
end
