class FieldsController < ApplicationController
    before_action :admin_authorized, only: :create

    def index 
        render json: Field.all
    end

    def show 
        field = Field.find_by!(id: params[:id])
        render json: field, status: :ok, serializer: FieldWithMeetUpsSerializer
    end

    def create
        new_field = Field.create!(field_params)
        render json: new_field, status: :created
    end

    private 

    def field_params
        params.permit(:field_name, :img_url, :location_id)
    end
end
