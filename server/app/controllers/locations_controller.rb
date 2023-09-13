class LocationsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    # GET /locations
    def index
        location = Location.all
        render json: location, status: :ok
    end
    # GET /locations/:id
    def show 
        location = Location.find_by(id: params[:id])
        render json: location, status: :ok
    end
end
