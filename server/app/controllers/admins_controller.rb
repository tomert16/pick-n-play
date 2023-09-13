class AdminsController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorized

    def create 
        new_admin = Admin.create!(admin_params)
        session[:admin_id] = new_admin.id
        render json: new_admin, status: :created
    end

    def show 
        admin = Admin.find(params[:id])
        render json: admin, status: :ok
    end

    def is_logged_in
        render json: current_admin, status: :ok
    end

    private

    def admin_params
        params.permit(:name, :email, :password, :password_confirmation)
    end
end
