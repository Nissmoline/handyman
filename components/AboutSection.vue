<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const expanded = ref(false)
const { t, tm } = useI18n()

const toStringArray = (value) => (Array.isArray(value) ? value : [])
const toFeatureArray = (value) => (Array.isArray(value) ? value : [])

const introParagraphs = computed(() => toStringArray(tm('about.intro')))
const bulletPoints = computed(() => toStringArray(tm('about.expanded.list')))
const leadParagraphs = computed(() => toStringArray(tm('about.expanded.lead')))
const featureItems = computed(() => toFeatureArray(tm('about.expanded.features')))
const closingParagraphs = computed(() => toStringArray(tm('about.expanded.closing')))
</script>

<template>
  <section class="about-root" id="about">
    <div class="about-container">
      <h2 class="about-title">{{ t('about.title') }}</h2>
      <div class="about-content">
        <p
          v-for="(paragraph, index) in introParagraphs"
          :key="'intro-' + index"
          v-html="paragraph"
        />
        <div style="text-align: center">
          <button
            v-if="!expanded"
            class="btn btn-outline"
            @click="expanded = true"
            type="button"
            :aria-label="t('about.cta.readMoreAria')"
          >
            {{ t('about.cta.readMore') }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="expanded">
            <ul class="about-list">
              <li v-for="(item, index) in bulletPoints" :key="'list-' + index" v-html="item">
              </li>
            </ul>
            <h2>{{ t('about.expanded.heading') }}</h2>
            <p
              v-for="(paragraph, index) in leadParagraphs"
              :key="'lead-' + index"
              v-html="paragraph"
            />
            <ul>
              <li v-for="feature in featureItems" :key="feature.title">
                <strong>{{ feature.title }}</strong> <span v-html="feature.description"></span>
              </li>
            </ul>
            <p
              v-for="(paragraph, index) in closingParagraphs"
              :key="'closing-' + index"
              v-html="paragraph"
            />
            <div style="text-align: center">
              <button
                class="btn btn-outline btn-collapse"
                @click="expanded = false"
                type="button"
                :aria-label="t('about.cta.collapseAria')"
              >
                {{ t('about.cta.collapse') }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<style scoped>
.about-root {
  background: #f8fafb;
  padding: 68px 0 44px 0;
  width: 100vw;
}

.about-container {
  max-width: 940px;
  margin: 0 auto;
  padding: 0 40px;
}

.about-title {
  font-size: 2.12rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #044877;
  letter-spacing: 0.02em;
  text-align: center;
}

.about-content {
  font-size: 1.14rem;
  color: #243648;
  font-weight: 400;
  line-height: 1.65;
  text-align: justify;
}

.about-content p {
  margin-bottom: 18px;
}

.about-list {
  list-style: disc inside;
  margin-bottom: 22px;
  color: #0d345a;
  font-size: 1.09rem;
  padding-left: 0;
  line-height: 1.45;
}

.about-list li {
  margin-bottom: 6px;
  padding-left: 4px;
  font-weight: 500;
}

.about-seo {
  font-size: 1.08rem;
  margin-top: 12px;
  color: #e92127;
  font-weight: 600;
  text-align: center;
}
.about-readmore {
  display: inline-block;
  cursor: pointer;
  color: #044877;
  font-weight: 600;
  margin: 10px 0;
  border-bottom: 1px dashed #044877;
  transition: color 0.2s;
}
.about-readmore:hover {
  color: #e92127;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-decoration: none;
  min-width: 180px;
  padding: 12px 12px;
  border-radius: 5px;
  font-size: 1.07rem;
  border: 2px solid #fff;
  background: transparent;
  color: #044877;
  cursor: pointer;
  font-weight: 500;
  transition: 0.19s;
  letter-spacing: 0.01em;
  font-family: inherit;
  line-height: 1.1;
  box-sizing: border-box;
}

.btn-outline {
  background: transparent;
  border: 2px solid #044877;
}

.btn-outline:hover:enabled {
  background: #044877;
  color: #fff;
}

.btn:disabled {
  opacity: 0.68;
  pointer-events: none;
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 16px;
  }
  .about-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  .about-root {
    padding: 3rem 0 2rem 0;
  }
  .about-content {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }
  .about-list {
    font-size: 0.95rem;
  }
  .btn {
    width: 100%;
    max-width: 280px;
    padding: 14px 20px;
    font-size: 1rem;
    border-radius: 8px;
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 0 12px;
  }
  .about-root {
    padding: 2rem 0 1.5rem 0;
  }
  .about-title {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
  .about-content {
    font-size: 0.95rem;
  }
  .about-list {
    font-size: 0.9rem;
  }
  .btn {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}
@media (max-width: 425px) {
  .about-container {
    padding: 0 4vw;
  }

  .about-title {
    font-size: 1.05rem;
    margin-bottom: 13px;
  }

  .about-content {
    font-size: 0.99rem;
    line-height: 1.43;
    padding-left: 12px;
    padding-right: 10px;
    text-align: justify;
  }

  .about-content p {
    margin-bottom: 12px;
  }

  .about-list,
  .about-content ul {
    padding-left: 18px;
  }

  .about-list li,
  .about-content ul li {
    margin-bottom: 5px;
    font-weight: 500;
    padding-left: 2px;
  }

  h2, .about-title {
    font-size: 1.13rem;
  }
  .btn {
    min-width: 0;
    width: 75%;
    font-size: 1rem;
    padding: 12px 0;
  }
  .btn.btn-collapse {
    min-width: 0;
    width: 50%;
  }
}
</style>



