require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  describe 'authorization' do
    context 'gdy zalogowany' do
      let(:user) { create(:user) }
      before { sign_in user } # devise helper

      it 'zwraca dane usera' do
        get me_path
        expect(response).to have_http_status(:ok)
      end
    end

    context 'gdy niezalogowany' do
      it 'przekierowuje do logowania' do
        get me_path
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end