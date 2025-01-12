import i18n from '@/locales'
export default {
  created () {
    this.singleActions = [
      {
        label: this.$t('compute.text_483', [this.$t('dictionary.server')]),
        permission: 'server_perform_attach_isolated_device',
        action: obj => {
          this.createDialog('AttachGpuDialog', {
            data: [obj],
            title: this.$t('compute.text_483', [this.$t('dictionary.server')]),
            columns: this.columns,
            refresh: this.refresh,
          })
        },
        meta: obj => {
          const ret = { validate: true }
          if (obj.dev_type === 'NIC') {
            ret.validate = false
            ret.tooltip = this.$t('compute.sriov_device_nic_notsupport')
            return ret
          }
          if (obj.guest_id) {
            ret.validate = false
          }
          return ret
        },
      },
      {
        label: this.$t('compute.text_485', [this.$t('dictionary.server')]),
        permission: 'server_perform_detach_isolated_device',
        action: obj => {
          this.createDialog('DetachGpuDialog', {
            data: [obj],
            title: this.$t('compute.text_485', [this.$t('dictionary.server')]),
            columns: this.columns,
            refresh: this.refresh,
          })
        },
        meta: obj => {
          const ret = { validate: true }

          if (obj.dev_type === 'NIC') {
            ret.validate = false
            ret.tooltip = this.$t('compute.sriov_device_nic_notsupport')
            return ret
          }

          if (!obj.guest_id) {
            ret.validate = false
            ret.tooltip = this.$t('compute.text_487', [this.$t('dictionary.server')])
            return ret
          }

          if (obj.dev_type === 'USB') {
            if (obj.guest_status !== 'ready' && obj.guest_status !== 'running') {
              ret.validate = false
              ret.tooltip = this.$t('compute.text_489', [this.$t('dictionary.server')])
              return ret
            }
          } else {
            if (obj.guest_status !== 'ready') {
              ret.validate = false
              ret.tooltip = this.$t('compute.text_489_1', [this.$t('dictionary.server')])
              return ret
            }
          }
          return ret
        },
      },
      {
        label: i18n.t('compute.text_490'),
        permission: 'isolated_devices_update',
        action: obj => {
          this.createDialog('SetReserveResourceDialog', {
            onManager: this.onManager,
            data: [obj],
            columns: this.columns,
            refresh: this.refresh,
          })
        },
        meta: obj => {
          const { dev_type } = obj
          if (!dev_type) {
            return { validate: false }
          }
          if (dev_type.indexOf('GPU') === -1) {
            return {
              validate: false,
              tooltip: this.$t('compute.text_1398', [dev_type]),
            }
          }
          return { validate: true }
        },
      },
    ]
  },
}
