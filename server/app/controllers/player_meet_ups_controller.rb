class PlayerMeetUpsController < ApplicationController
    def index 
        render json: PlayerMeetUp.all, status: :ok
    end

    def show 
        teammates = PlayerMeetUp.find_by!(id: params[:id])
        render json: teammates
    end


    def destroy
        render json: PlayerMeetUp.destroy_by(player_meet_up_params), status: :no_content
    end

    private

    def player_meet_up_params
        params.permit(:meet_up_id, :player_id)
    end
end
