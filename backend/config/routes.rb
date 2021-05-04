Rails.application.routes.draw do
  resources :products, except: [:new, :edit] do 
    resources :item_code_parameters, except: [:new, :edit]
    resources :items, except: [:new, :edit]
  end
end
