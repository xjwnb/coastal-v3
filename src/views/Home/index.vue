<script lang="tsx">
import { defineComponent,  } from "vue";

export default defineComponent({
  components: {
  },

  setup() {

    return () => (
      <div>
        home
        <el-button>嘿嘿嘿</el-button>
        <svg-icon name="logo" color="red"/>
      </div>
    )
  }
})
</script>

