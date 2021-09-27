import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Loading extends VuexModule {
    loading = false;

    @Mutation
    updateLoading(): void {
        this.loading = !this.loading;
    }

    @Action
    toggleLoading(): void {
        this.context.commit('updateLoading');
    }
}
