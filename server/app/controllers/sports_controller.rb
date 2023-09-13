class SportsController < ApplicationController
    before_action :admin_authorized, only: :create

    def index 
        sports = Sport.all
        if params[:sport_type] 
            search_sport = params[:sport_type].downcase
            sports = sports.filter { |sport| sport.sport_type.downcase == search_sport }
        end
        render json: sports
    end

    def show 
        sport = Sport.find_by!(id: params[:id])
        render json: sport, serializer: SportWithMeetupsSerializer
    end

    def create 
        new_sport = Sport.create!(sport_params)
        render json: new_sport, status: :created
    end

    private

    def sport_params
        params.permit(:sport_type, :img_url, :bg_img, :location_id)
    end
end
