class MeetUpsController < ApplicationController
    wrap_parameters format: []
    def index 
        render json: MeetUp.all
    end

    def show 
        meet_up = MeetUp.find(params[:id])
        render json: meet_up, status: :ok 
    end

    def create
        new_meet_up = MeetUp.create!(meet_up_params)
        render json: new_meet_up, status: :created
    end

    def destroy
       render json: MeetUp.destroy_by(meet_up_params)
    end

    def join_meet_up
        join = PlayerMeetUp.create!(player_meet_up_params)
        join = PlayerMeetUp.includes(:player).find(join.id)
        render json: join, status: :accepted
    end

    private 

    def meet_up_params
        params.permit(:sport_id, :date, :field_id, :player_id)
    end
    def player_meet_up_params
        params.permit(:meet_up_id, :player_id)
    end
end
