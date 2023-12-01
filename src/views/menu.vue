<template>
    <div>
        <el-table
        :data="routerTree"
        style="width: 100%; margin-bottom: 20px"
        row-key="path"
        default-expand-all
        >
            <el-table-column prop="name" label="展示名称"  />
            <el-table-column prop="meta.icon" label="图标">
                <template #default="scope">
                    <el-icon>
                        <component :is="scope.row.meta.icon"></component>
                    </el-icon>
                    <span>
                        {{ scope.row.meta.icon }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="path" label="路由路径"  />
            <el-table-column prop="component" label="文件路径"  />
        </el-table>
    </div>
</template>


<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
let routerTree = router.currentRoute.value.matched[0].children
routerTree.forEach((item)=>{
    if (item.children) {
        item.children.forEach((c)=>{
            c["component"] = c["component"].toString()
            c["component"] = c["component"].match(/"([^"]*)"/)
        })
    }else{
            item["component"] = item["component"].toString()
            item["component"] = item["component"].match(/"([^"]*)"/)
    }
})
</script>