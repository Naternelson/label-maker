class ProductSerializer
    def initialize(product_obj)
        @product = product_obj
    end

    def to_s_json
        # binding.pry
        # @product.to_json(
        #     except: [:created_at, :updated_at],
        #     include: {item_code_parameters: {
        #         except: [:created_at, :updated_at]
        #     }}
        # )

        options = {
            except: [:created_at, :updated_at],
            include: {item_code_parameters: {
                except: [:created_at, :updated_at]
            }}
        }
        @product.to_json(options)
    end
end