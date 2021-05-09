class ProductsController < ApplicationController

    def index
        products = Product.all 
        options = {include: [:item_code_parameters]}
        render json: ProductSerializer.new(products, options)
    end

    def create
        product = Product.create(product_params)
        for i in params[:item_code_parameters] do 
            product.item_code_parameters.create(regex: i[:regex], name: i[:name])
        end
        options = {include: [:item_code_parameters, :items]}
        render json: ProductSerializer.new(product, options)
    end

    def show
        product = Product.find_by_id params[:id]
        options = {include: [:item_code_parameters, :items]}
        render json: ProductSerializer.new(product, options)
    end

    def update
        binding.pry
    end

    def destroy

    end

    private

    def product_params
        params.require(:product).permit(:name, :description)
    end

end
