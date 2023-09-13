class PlayersController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorized, only: [:create, :me]

    def index 
        render json: Player.all
    end

    def create 
        new_player = Player.create!(player_params)
        session[:player_id] = new_player.id
        render json: new_player, status: :created
    end

    def show
        player = Player.find(params[:id])
        render json: player, serializer: IndividualPlayerSerializer
    end
    
    def update
        player_update = current_user.update!(location: params[:location])
        render json: player_update, status: :accepted
    end

    def me
        render json: current_user,  serializer: IndividualPlayerSerializer, status: :ok
    end


    private

    def player_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
