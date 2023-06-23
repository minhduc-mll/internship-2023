import type { Ref } from "vue";
import { BaseStore, defineClassStore } from "@/plugins/store.plugin";
import { EventBus } from "@/plugins/bus.plugin";

export const eventBus = new EventBus({
  onError: (error: any) => {
    console.error("Event Bus got error", error);
  },
});

export const useCommonStore = defineClassStore(
  class Store extends BaseStore {
    public name: string = "common";

    public isLoading: Ref<boolean> = this.ref(false);

    public eventBus: Ref<EventBus> = this.ref(eventBus);

    public setIsloading = (bool: boolean) => {
      this.isLoading.value = bool;
    };
  },
);
