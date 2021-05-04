class ProductsController < ApplicationController

    def index
        products = Product.all 
        render json: ProductSerializer.new(products).to_s_json
    end

    def create

    end

    def show

    end

    def update

    end

    def destroy

    end

end
