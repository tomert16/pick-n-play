class RequestsController < ApplicationController
    before_action :admin_authorized, only: [:destroy, :managed_requests]

    def index 
        render json: Request.all, status: :ok
    end

    def managed_requests
        render json: Request.all, status: :ok
    end

    def create
        new_request = Request.create!(request_params)
        render json: new_request, status: :created
    end

    def update
        request = Request.find_by!(id: params[:id])
        request.update(request_params)
        render json: request.reload, status: :accepted
    end

    def destroy
        request = Request.find_by!(id: params[:id])
        render json: request.destroy, status: :no_content
    end

    private

    def request_params
        params.permit(:name, :location, :likes, :dislikes, :player_id)
    end
end
